import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import type { Role } from '@prisma/client';
import { prisma } from "@/prisma/prisma-client"
import { compare, hashSync } from "bcrypt"
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: 'USER' as Role
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.CLIENT_ID || "",
            clientSecret: process.env.CLIENT_SECRET || ''
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Emial', type: 'text' },
                password: { label: 'Password', type: 'text' }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null
                }
                const values = {
                    email: credentials.email
                }
                const findUser = await prisma.user.findFirst({
                    where: values
                })

                if (!findUser) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, findUser.password)
                if (!isPasswordValid) {
                    return null;
                }

                if (!findUser.verfied) {
                    return null;
                }

                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.fullname,
                    role: findUser.userRole
                }
            }
        })
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider == 'credentials') {
                    return true;
                }
                if (!user.email) {
                    return false;
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email }
                        ]
                    }
                })
                if (findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id
                        }, data: {
                            provider: account?.providerAccountId,
                            providerId: account?.providerAccountId
                        },
                    })
                    return true
                }
                await prisma.user.create({
                    data: {
                        fullname: user.name || 'User #' + user.id,
                        email: user.email,
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                        password: hashSync(user.id.toString(), 10),
                        verfied: new Date(),

                    }
                })
                return true;
            } catch (error) {
                console.log('Error [SIGNIN]', error)
            }
            return true

        },
        async jwt({ token }) {
            if(!token.email){
                return token;
            }
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            })

            if (findUser) {
                token.id = String(findUser.id)
                token.email = findUser.email
                token.fullname = findUser.email
                token.role = findUser.userRole
            }
            return token
        },
        session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id
                session.user.role = token.role
            }

            return session;
        }
    }
}

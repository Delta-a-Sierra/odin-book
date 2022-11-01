import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import * as argon2 from "argon2";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  getIsNewUser: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        if (!ctx.session || !ctx.session.user) {
          throw new Error('no active session')
        }
        const user = await ctx.prisma.user.findFirst({ where: { id: ctx.session.user.id }, select: { isNewUser: true } })
        if (!user) {
          throw new Error('no user matches session')
        }
        return user.isNewUser
      } catch {
        throw new Error('Unable to connect to database')
      }
    }),
  setIsNewUser: protectedProcedure
    .input(z.object({
      isNewUser: z.boolean()
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        if (!ctx.session || !ctx.session.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'no active user session' })
        }
        await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id
          },
          data: {
            isNewUser: input.isNewUser
          }
        })
      } catch (e) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'unable to connect to database', cause: e })
      }
    }),
  signUp: publicProcedure
    .input(z.object({
      username: z.string(),
      password: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const { username, password } = input
      let user = null
      try {
        user = await ctx.prisma.user.findUnique({ where: { email: username } })
        if (user !== null) {
          return { status: 400, ok: false, message: 'user already exisits' }
        }
        try {
          const hash = await argon2.hash(password);
          await ctx.prisma.user.create({ data: { email: username, password: hash } })
        } catch {
          throw new Error('Unable to connect to database')
        }
        return { status: 201, ok: true, message: 'user created' }
      } catch {
        throw new Error('unable to connect to database')
      }
    }),
});

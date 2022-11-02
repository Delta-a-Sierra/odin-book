import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const updateUser = async ({ ctx, input }) => {
  if (input.dob && !z.date().safeParse(input.dob)) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'not a valid date' })
  }
  try {
    await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id
      },
      data: {
        ...input
      }
    })
  }
  catch (e) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'database unavailable', cause: e })
  }
}

export const userRouter = router({
  getSessionUser: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        if (!ctx.session || !ctx.session.user) {
          throw new Error('no active session')
        }
        const user = await ctx.prisma.user.findFirst({ where: { id: ctx.session.user.id } })
        if (!user) {
          throw new Error('no user matches session')
        }
        return user
      } catch {
        throw new Error('Unable to connect to database')
      }
    }),
  updateGetStarted: protectedProcedure
    .input(z.object({
      city: z.string(),
      country: z.string(),
      name: z.string(),
      dob: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id
          },
          data: {
            country: input.country,
            city: input.city,
            name: input.name,
            dob: input.dob,
            isNewUser: false
          }
        })
      } catch (err) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'unable to connect to database', cause: err })
      }
    }),
});

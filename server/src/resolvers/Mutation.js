function post(parent, args, context, info) {
    return context.prisma.createChat({
      message: args.message,
    })
  }

  module.exports = {
      post,
  }
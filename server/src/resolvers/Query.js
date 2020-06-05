function feed(parent, args, context, info) {
    return context.prisma.chats()
  }
  
  module.exports = {
    feed,
  }
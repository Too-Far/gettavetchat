function newChatsubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.chat({ mutation_in: ['CREATED'] }).node()
  }
  
  const newChat = {
    subscribe: newChatsubscribe,
    resolve: payload => {
      return payload
    },
  }
  
  module.exports = {
    newChat,
  }
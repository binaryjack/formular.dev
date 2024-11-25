enum EMessageType {
    PUBLIC = 'public',
    PRIVATE = 'private'
}

interface IMember {
    new(name: string): IMember
    name: string
    mediator: IMediator | null 
    
    sendAll: (message: string) => void
    sendPublic: (message: string, to?: IMember) => void
    sendPrivate: (message: string, to: IMember) => void
    receive: (message: string, from: IMember) => void

}

interface IMediator {
    new(): IMediator
    members: IMember[]
    addMember: (member: IMember) => void
    addMembers: (members: IMember[]) => void
    handleMessages: (message: string, from: IMember, to: IMember, type: EMessageType) => void
    handleGeneralMessages: (message: string, from: IMember) => void
}

const Member = function(this: IMember, name: string) {
    this.name = name
    this.mediator = null

} as any as IMember

Member.prototype = {
    sendAll: function(message: string, to: IMember) {
        this?.mediator?.handleGeneralMessages?.(message, this, to, EMessageType.PRIVATE)
    },    
    sendPrivate: function(message: string, to: IMember) {
        this?.mediator?.handleMessages?.(message, this, to, EMessageType.PRIVATE)
    },
    sendPublic: function(message: string, to: IMember) {
        this?.mediator?.handleMessages?.(message, this, to, EMessageType.PUBLIC)
    },
    receive: function(message: string, from: IMember) {
         console.info(`from ${from.name} to ${this.name}: ${message}`)
    }
}

const Mediator = function(this: IMediator) {
    this.members = []
} as any as IMediator

Mediator.prototype = {
    addMember: function(member: IMember) {
        member.mediator = this
        this.members.push(member)
    },
    addMembers: function(members: IMember[]) {
        members.forEach(o => o.mediator = this)
        this.members.push(...members)
    },
    handleMessages: function(message: string, from: IMember, to: IMember, type: EMessageType) {
        if(type === EMessageType.PUBLIC) {
            console.warn(`[PUBLIC] - from ${from.name} to ${to.name}: ${message}`)
        }    
        to.receive(message, from)
    },
    handleGeneralMessages: function(message: string, from: IMember) {  
        console.warn(`[GENERAL] - from ${from.name}: ${message}`)   
    }
}
const mediator = new Mediator()

const eric = new Member('Eric')
const sophie = new Member('Sophie')
const alex = new Member('Alex')
const kendra = new Member('Kendra')


mediator.addMember(eric)
mediator.addMember(sophie)
mediator.addMember(alex)
mediator.addMember(kendra)

const benoit = new Member('Benoît')
const serge = new Member('Serge')
const fanny = new Member('Fanny')
const ella = new Member('Ella')

mediator.addMembers([benoit, serge, fanny, ella])

eric.sendAll('hello everyone!')
sophie.sendAll('hey what\'s up?!')
alex.sendAll('Salut !')
kendra.sendAll('here Kendra from Spain, what\'s the subject here  ? ')
benoit.sendPrivate("Hello Sophie!", sophie)
sophie.sendPublic("Hi Benoit!", benoit)
ella.sendPrivate('see the rules of the chatroom at https://www.myChatRoom.com/rules', kendra)
kendra.sendPrivate("thanks !", ella)
fanny.sendPublic("where are the rules of the chat room plz ?", ella)
ella.sendAll('Kind reminder of the chatroom rules at https://www.myChatRoom.com/rules')
serge.sendAll('thanks ella!')
ella.sendAll('It\'s Ella btw! you\'re welcome!')
serge.sendPublic('sorry Ella, thanks!', ella)
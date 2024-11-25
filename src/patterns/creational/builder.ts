enum EGender {
    M ='man',
    F ='lady'
}

enum ERole {
    SECURITY ='security',
    OFFICE ='office',
    TRAFFIC ='traffic',
    PUBLIC_RELATIONS ='public relations',
}


interface IAgent {
    new(name: string,
        age: number,
        role: ERole,
        gender: EGender): IAgent
    name: string
    age: number
    role: ERole
    gender: EGender
    print: () => void
}

const Agent = function (
    this: IAgent,
    name: string,
    age: number,
    role: ERole,
    gender: EGender) {    
        this.name = name
        this. age = age
        this.role = role
    this.gender = gender
    this.name = name
    this.age = age
    this.role = role
    this.gender = gender
} as any as IAgent
    
Agent.prototype = {
    print: function() {
        console.log(`hi! I'am ${this.name} I have ${this.age} years old i am a ${this.gender}, I'll be responsible for the ${this.role} management of the team.`)
    }
}

interface IAgentBuilder extends IAgent {
    new(name: string, age: number): IAgentBuilder
    isMan: () => IAgentBuilder
    isLady: () => IAgentBuilder
    isSecurityOfficer: () => IAgentBuilder
    isOfficeOfficer: () => IAgentBuilder
    isTrafficOfficer: () => IAgentBuilder
    isPubRelOfficer: () => IAgentBuilder
    build: ()=> IAgent
}

const AgentBuilder = function(
    this: IAgentBuilder,
    name: string,
    age: number
) {
    this.name = name
    this.age = age    
} as any as IAgentBuilder

AgentBuilder.prototype = {
    isMan: function () { 
        this.gender = EGender.M
        return this
    },
    isLady: function () {
        this.gender = EGender.F
        return this
    },
    isSecurityOfficer: function () {
        this.role = ERole.SECURITY
        return this
    },
    isOfficeOfficer: function() {
        this.role = ERole.OFFICE
        return this
    },
    isTrafficOfficer: function() {
        this.role = ERole.TRAFFIC
        return this
    },
    isPubRelOfficer: function() {
        this.role = ERole.PUBLIC_RELATIONS
        return this
    },
    build: function () {
        return new Agent(this.name, this.age, this.role, this.gender)
    } 
}

const agents: IAgent[] = []

agents.push(new AgentBuilder('Monika', 23).isLady().isOfficeOfficer().build())
agents.push(new AgentBuilder('John', 19).isMan().isPubRelOfficer().build())
agents.push(new AgentBuilder('Lorie', 24).isLady().isSecurityOfficer().build())
agents.push(new AgentBuilder('Aaron', 19).isMan().isSecurityOfficer().build())
agents.push(new AgentBuilder('Jack',30).isMan().isTrafficOfficer().build())
agents.push(new AgentBuilder('Eleonore',30).isLady().isTrafficOfficer().build())



agents.forEach(o => {
    o.print()
})
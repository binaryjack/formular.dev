
interface IArticle {
    name: string
    price: number
}

interface IArticlePriceResult {
    providerName : string
    articleName: string        
    price?: number
    error?: string 
}

const newArticlePriceResult = (
    providerName : string,
    articleName: string,
    price?: number,
    error?: string) => {
        return {
            providerName,
            articleName,     
            price,
            error
        }
    
}

const newArticle = ( 
    name: string,
    price: number) => { 
    return { 
            name,
            price
        }
    }

interface IServiceProvider {
    new(name: string): IServiceProvider
    name: string
    articles: IArticle[]
    getArticlePrice: (articleName: string) => number | undefined
    adArticlesRange: (articles: IArticle[]) => void 
}

interface IStrategy {
    new(): IStrategy
    providers: IServiceProvider[]
    addStrategy: (provider: IServiceProvider) => void
    getArticlePrice: (articleName: string) => IArticlePriceResult[] 
}


const ServiceProvider = function(this:IServiceProvider, name: string)  {
    this.name = name
    this.articles = []
} as any as IServiceProvider


ServiceProvider.prototype = {
    getArticlePrice: function(articleName: string) {
        return this.articles.find((o: IArticle)  => o.name === articleName)?.price
    },
    adArticlesRange: function(articles: IArticle[]) {
        this.articles = [...articles]
    }
}

const Strategy = function(this: IStrategy) {
    this.providers = []
}  as any as IStrategy

Strategy.prototype = {
    addStrategy: function(provider: IServiceProvider){
        this.providers.push(provider)
    },
    getArticlePrice: function(articleName: string) {

    const output: IArticlePriceResult[]=[]
        this.providers.forEach((provider: IServiceProvider ) => {
            const articlePrice = provider.getArticlePrice(articleName)
            const outputResult =  newArticlePriceResult(provider.name, articleName, articlePrice, !articlePrice ? 'No price found!': undefined)
            output.push(outputResult)
        })
        return output
    }
}

const migrosArticle = [
    newArticle("butter", 3.4),  
    newArticle("sugar", 1.65),
    newArticle("bread", 5.65),
]

const coopArticles =[
    newArticle("butter", 4.1),
    newArticle("sugar", 2.1),
    newArticle("bread", 4.7),
]

const aldiArticles =[
    newArticle("butter", 2.1),
    newArticle("sugar", 0.45),
    newArticle("bread", 2.7),
]

const lydlArticles =[
    newArticle("butter", 2.9),
    newArticle("sugar", 1.1),
    newArticle("bread", 1.95),
]

const migros = new ServiceProvider('Migros')
const coop = new ServiceProvider('Coop')
const aldi = new ServiceProvider('Aldi')
const lydl = new ServiceProvider('Lydl')

migros.adArticlesRange(migrosArticle)
coop.adArticlesRange(coopArticles)
aldi.adArticlesRange(aldiArticles)
lydl.adArticlesRange(lydlArticles)

const strategy = new Strategy()

strategy.addStrategy(migros)
strategy.addStrategy(coop)
strategy.addStrategy(aldi)
strategy.addStrategy(lydl)

const printArticleCompare = (priceCollection: IArticlePriceResult[]) =>  {
    for(const p of priceCollection) {
        console.log(`${p.providerName}'s ${p.articleName} ${p.price ?? p.error}`)
    }
}


const butterPriceCompare = strategy.getArticlePrice('butter')
const sugarPriceCompare = strategy.getArticlePrice('sugar')
const breadPriceCompare = strategy.getArticlePrice('bread')


printArticleCompare(butterPriceCompare)
printArticleCompare(sugarPriceCompare)
printArticleCompare(breadPriceCompare)
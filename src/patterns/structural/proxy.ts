// External API service
interface ICountry {
    name: string
    capital: string
}
const newCountry = (
    name: string,
    capital: string) => {
    return {
        name,
        capital
    }
}

interface ICountryCapitalsApi {
    new(): ICountryCapitalsApi
    capitals: ICountry[]
    get:(countryName: string) => ICountry | undefined
}
///////////////////////////////////////////////////////////////
const CountriesCapitalsApi = function(this: ICountryCapitalsApi) {
    this.capitals = []
    this.get = function (countryName: string) {
        console.info('... ...calling external country API')
        return this.capitals.find(o => o.name === countryName)
    }
    const init = () => {
        console.warn('...initialize API...')
        this.capitals = [
            newCountry('Switzerland', 'Bern'),
            newCountry('Germany', 'Berlin'),
            newCountry('France', 'Paris'),
            newCountry('Portugal', 'Lisbon'),
            newCountry('Spain', 'Madrid'),
            newCountry('Greece', 'Athens'),
            newCountry('Japan', 'Tokyo'),
            newCountry('China', 'Beijing'),
            newCountry('Italy', 'Rome'),
            newCountry('Belgium', 'Liege')
        ]
    }
    init()
} as any as ICountryCapitalsApi
///////////////////////////////////////////////////////////////

interface ICountryCapitalsProxy {
    new(): ICountryCapitalsProxy
    cache: ICountry[]
    getCapital: (countryName: string) => ICountry | undefined  
}

const CountryCapitalsProxy = function (this: ICountryCapitalsProxy) {
    const api = new CountriesCapitalsApi()
    this.cache = []
    this.getCapital = function(countryName: string) {
      try {
          const existingCachedCountry = this.cache.find(o => o.name === countryName)
          if (!existingCachedCountry) {
              const newCountry = api.get(countryName) 
              if (!newCountry) {
                  throw(new Error(`There is no country called:${countryName} in the distant api`))
              }
              this.cache.push(newCountry)
              return newCountry
          }
          return existingCachedCountry
      } catch (error) {
          console.error(error)
          return undefined
      }
    }
} as any as ICountryCapitalsProxy


const countryListNames = [
    'Switzerland',
    'Germany', 
    'France', 
    'Portugal', 
    "Argentina",
    'Spain', 
    'Greece',
    'Japan', 
    "Ethiopia",
    'China',
    'Italy',
    'Belgium',
    'Switzerland',
    'Germany', 
    'France', 
    'Portugal', 
    "Argentina",
    'Spain', 
    'Greece',
    'Japan', 
    "Ethiopia",
    'China',
    'Italy',
    'Belgium',
    'Switzerland',
    'Germany', 
    'France', 
    'Portugal', 
    "Argentina",
    'Spain', 
    'Greece',
    'Japan', 
    "Ethiopia",
    'China',
    'Italy',
    'Belgium',
]

const countryProxy = new CountryCapitalsProxy()

countryListNames.forEach(o => {
    const country = countryProxy.getCapital(o)
    if (!country) {
        console.warn(`Sorry we could not find ${o} country in our system`)
    } else {
        console.debug(`The capital of ${country.name} is ${country.capital}`)
    }
})




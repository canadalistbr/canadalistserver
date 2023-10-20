import { City } from "@prisma/client";
import { LoadCitiesRepository } from "../../../../data/protocols/load-cities/load-cities-repository";
import { prisma } from "../prisma";

function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeFirstLetter(str: string) {
  const strArr = str.split(' ')
  return strArr.map(capitalizeString).join(' ')
}
export function getCityPopulation(size: 'Small' | 'Medium' | 'Big') {
  if (size === 'Small') {
    return {
      lt: 100000 //100k`
    }
  }
  if (size === 'Medium') {
    return {
      gt: 100000, // 100k
      lte: 1000000 // 1 million
    }
  }
  return {
    gt: 1000000 //1 million
  }
}

//TODO: Refactor entire repository after filters are done
export class CitiesPrismaRepository implements LoadCitiesRepository {
  loadAll(filters?: any): Promise<City[]> {
    const isBikeFriendly = Boolean(filters?.bikeFriendly)
    const hasNature = Boolean(filters?.nature)
    const hasFestivals = Boolean(filters?.festivals)
    const hasWinter = Boolean(filters?.winter)
    const hasSize = Boolean(filters?.size)
    const hasProvince = Boolean(filters?.province)
    const hasFrench = Boolean(filters?.fr)
    const hasEnglish = Boolean(filters?.en)

    let language: any

    if (hasEnglish && hasFrench) {
      language = {
        equals: [
          "En", "Fr"
        ]
      }
    } else if (hasEnglish && !hasFrench) {
      language = {
        equals: [
          "En"
        ]
      }
    } else if (!hasEnglish && hasFrench) {
      language = {
        equals: [
          "Fr"
        ]
      }
    } else {
      language = {
        has: "En" || "Fr"
      }
    }


    const cities = prisma.city.findMany({
      where: {
        bikeFriendly: isBikeFriendly || {},
        nature: hasNature || {},
        festivals: hasFestivals ? {
          not: ''
        } : {},
        winter: hasWinter ? filters?.winter : {},
        population: hasSize ? getCityPopulation(filters?.size) : {},
        provinces: hasProvince ? {
          name: capitalizeFirstLetter(filters?.province)
        } : {},
        language
      },
      include: {
        provinces: true
      }
    });
    return cities;
  }
}

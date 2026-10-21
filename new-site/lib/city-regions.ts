// Region grouping for the full "Where we repair <Brand> operators" city list on
// brand pages (app/brands/[slug]/page.tsx). Every slug in lib/constants.ts ALL_CITIES
// must appear in exactly one region here.
export interface CityRegion {
  name: string;
  citySlugs: string[];
}

export const CITY_REGIONS: CityRegion[] = [
  {
    name: "Santa Clarita Valley",
    citySlugs: [
      "santa-clarita", "valencia", "saugus", "newhall", "canyon-country",
      "stevenson-ranch", "castaic", "val-verde", "agua-dulce", "acton",
    ],
  },
  {
    name: "Antelope Valley",
    citySlugs: [
      "palmdale", "lancaster", "quartz-hill", "littlerock", "leona-valley",
      "lake-hughes", "lake-elizabeth", "green-valley", "sun-village", "pearblossom",
    ],
  },
];

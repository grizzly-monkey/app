export type farm = {
  farmId: string;
  id: string;
  organisationId: string;
  name: string;
  area: number;
  cultivableArea: number;
  location: {
    address: string;
    lat: number;
    long: number;
  };
  polyhouses: [];
  reservoirs: [];
  nutrient: {
    type: string;
    dilutionRatio: {
      denominator: number;
      numerator: number;
    };
  };
  device: any;
  state: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
};

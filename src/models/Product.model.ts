export interface ProductModel {
  id: number;
  attributes: {
    name: string;
    description: string;
    price: number;
    discount: number;
    points: string;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
}

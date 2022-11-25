export interface CategoryModel {
  id: number;
  attributes: {
    name: string;
    description: string;
    cover: {
      data: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
  };
}

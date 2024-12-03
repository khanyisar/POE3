export type CourseType = 'starter' | 'main' | 'dessert';

export type MenuType = {
    id: string;
    name: string;
    description: string;
    amount: string;
    image: string;
    course?: CourseType;
};

export type AddMenuFormType = MenuType;
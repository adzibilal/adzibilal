// constants/technologies.ts

export interface Technology {
    name: string;
    imageUrl: string;
    description: string;
}

export const technologies: Technology[] = [
    {
        name: 'Next.js 13',
        imageUrl: '/images/tech/nextjs.png',
        description: "I chose Next.js for this project because of its versatility, server-side rendering capabilities, and seamless integration with React. It allows for blazing-fast page loads and a smooth user experience.",
    },
    {
        name: 'TypeScript',
        imageUrl: '/images/tech/typescript.png',
        description: "TypeScript is my preferred language for writing robust and maintainable code. It adds static typing to JavaScript, which helps catch errors early in the development process.",
    },
    {
        name: 'MongoDB',
        imageUrl: '/images/tech/mongo.png',
        description: "MongoDB serves as the database for this website, allowing me to store and retrieve data efficiently. Its flexibility and scalability make it an excellent choice for a variety of applications.",
    },
    {
        name: 'Tailwind CSS',
        imageUrl: '/images/tech/tailwind.png',
        description: "The website's design is powered by Tailwind CSS, a utility-first CSS framework. It enables me to create responsive, beautiful, and consistent user interfaces with ease.",
    },
    {
        name: 'Cloudinary',
        imageUrl: '/images/tech/cloudynary.jpg',
        description: "I use Cloudinary to handle image and media assets. It provides cloud-based storage, optimization, and delivery, ensuring that the website loads quickly and efficiently.",
    },
];

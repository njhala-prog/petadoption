import React from 'react';

export const Articles = ({ article }) => {
    // If no article is provided, use default content
    const defaultArticle = {
        title: "The Benefits of Pet Adoption",
        author: "Jane Doe",
        date: "July 28, 2024",
        image: "https://plus.unsplash.com/premium_photo-1661503280224-a86d7ad2a574?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: [
            "Adopting a pet can be one of the most rewarding experiences in life. Not only do you gain a loving companion, but you also save a life and create space for shelters to help more animals in need.",
            "When you choose to adopt, you're giving a second chance to an animal who might have otherwise been overlooked. Many shelter pets are already housetrained and used to living with families, making them excellent companions from day one.",
            "Moreover, adoption is often more cost-effective than purchasing a pet from a breeder or store. Most shelter animals are already spayed or neutered, vaccinated, and sometimes even microchipped, saving you both time and money.",
            "By adopting, you're also taking a stand against puppy mills and pet stores that may source from these inhumane breeding operations. You're supporting a culture of animal welfare and responsible pet ownership.",
            "Remember, when you adopt, you're not just changing an animal's life - you're changing your own. The unconditional love and companionship of a pet can bring joy, laughter, and a sense of purpose to your daily life.",
        ]
    };

    const { title, author, date, image, content } = article || defaultArticle;

    return (
        <article className="max-w-2xl mx-auto mt-10 px-4">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                <div className="text-sm text-gray-600">
                    <span>By {author} | </span>
                    <time>{date}</time>
                </div>
            </header>

            <img
                src={image}
                alt="Article header image"
                className="w-full h-64 object-cover rounded-lg mb-8"
            />

            <div className="prose prose-lg">
                {content.map((paragraph, index) => (
                    <p key={index} className="mb-4">
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200">
                <p className="text-base text-gray-600">
                    If you enjoyed this article, consider sharing it with friends who might be interested in pet adoption.
                </p>
            </div>
        </article>
    );
};


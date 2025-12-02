import React, { useState } from 'react';
import {Accord} from "./Accord"

export const Faq = () => {
  const faqs = [
    {
      id: 1,
      que: 'How do I adopt a pet?',
      description: 'To adopt a pet, browse our available pets online, visit our shelter, and fill out an adoption application.'
    },
    {
      id: 2,
      que: 'Can I adopt if I live in an apartment?',
      description: 'Yes, you can adopt a pet if you live in an apartment. Some pets may require more space and outdoor time than others. We can help you find a pet that fits your living situation.'
    },
    {
      id: 3,
      que: 'What are the adoption fees?',
      description: 'Adoption fees vary depending on the type of pet and its age. Typically, adoption fees range from $50 to $200, which covers vaccinations, spaying/neutering, and a health check-up. Please check our website for specific fee details.'
    },
    {
      id: 4,
      que: 'What should I prepare before adopting a pet?',
      description: 'Before adopting a pet, prepare your home by setting up a designated space for the pet with a bed, food and water bowls, and toys. Make sure you have a supply of pet food, a collar and leash for dogs, and a litter box for cats. Pet-proof your home by removing hazards.'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-center mb-12 text-4xl font-bold text-gray-800 md:text-5xl">
          Frequently Asked Questions
        </h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {faqs.map((faq) => (
            <Accord key={faq.id} p={faq} />
          ))}
        </div>
      </div>
    </div>
  );
};
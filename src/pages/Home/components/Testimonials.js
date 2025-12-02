import React from 'react'

export const Testimonials = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 py-16">
      <h1 className="text-center mb-12 text-4xl font-bold text-gray-800 md:text-5xl lg:text-5xl">
        What Our Adopters Say
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto px-4">
        {[
          {
            name: "Sarah Johnson",
            role: "Adopted a Labrador Retriever",
            quote: "The adoption process was seamless, and the staff was incredibly helpful and kind. I found my best friend, Bella, and couldn't be happier!",
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
          },
          {
            name: "John Doe",
            role: "Adopted a Beagle",
            quote: "Adopting from this shelter was the best decision I ever made. Max is such a joy, and the team made sure everything was perfect.",
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
          },
          {
            name: "Emily Clark",
            role: "Adopted a Black Cat",
            quote: "The staff provided exceptional support throughout the adoption process. Shadow has brought so much love into our home.",
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
          },
          {
            name: "Michael Brown",
            role: "Adopted a German Shepherd",
            quote: "We adopted Rex from here, and the whole experience was wonderful. The shelter staff are truly dedicated to the animals.",
            image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
          }
        ].map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <img className="w-12 h-12 rounded-full mr-4" src={testimonial.image} alt={testimonial.name} />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  )
}



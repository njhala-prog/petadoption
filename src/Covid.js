import React, { useState } from 'react';

export const Covid = () => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? null : section);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>How to Adopt a Dog or Cat During COVID-19</h1>

            <div style={{ backgroundColor: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: '4px', padding: '15px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Adoption is still possible!</h2>
                <p>The pet adoption process has changed, but it's still possible to adopt a new best friend safely.</p>
            </div>

            <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', padding: '15px', borderBottom: '1px solid #d9d9d9' }}>New Pet Adoption Processes</h2>
                <ul style={{ listStyleType: 'disc', paddingLeft: '35px', margin: '15px 0' }}>
                    <li>Digital adoption applications and virtual 'meet and greets'</li>
                    <li>Virtual adoptions and events hosted online or through social media</li>
                    <li>Curbside pet adoptions (once applications have been approved)</li>
                    <li>Phone or video chat conversations with adoption counselors</li>
                    <li>Pre-scheduled interviews and appointment-only adoption hours</li>
                </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => toggleAccordion('reasons')}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '15px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Reasons to Adopt During COVID-19 {openAccordion === 'reasons' ? '▲' : '▼'}
                </button>
                {openAccordion === 'reasons' && (
                    <div style={{ border: '1px solid #d9d9d9', borderTop: 'none', padding: '15px' }}>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                            <li>Ease the burden on shelters and rescues</li>
                            <li>Flexible fostering or foster-to-adopt arrangements available</li>
                            <li>Shelters have adapted with safety measures</li>
                            <li>It's always a good time to help a pet in need!</li>
                        </ul>
                    </div>
                )}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => toggleAccordion('advice')}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '15px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Advice for Potential Adopters {openAccordion === 'advice' ? '▲' : '▼'}
                </button>
                {openAccordion === 'advice' && (
                    <div style={{ border: '1px solid #d9d9d9', borderTop: 'none', padding: '15px' }}>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                            <li>Be flexible with new processes</li>
                            <li>Ask questions if you have concerns</li>
                            <li>Be patient with the adoption process</li>
                            <li>Give your new pet time to acclimate (2-3 weeks)</li>
                        </ul>
                    </div>
                )}
            </div>

            <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', padding: '15px', borderBottom: '1px solid #d9d9d9' }}>Other Ways to Help</h2>
                <ul style={{ listStyleType: 'disc', paddingLeft: '35px', margin: '15px 0' }}>
                    <li>Consider fostering if you can't adopt</li>
                    <li>Donate to the Petfinder Foundation</li>
                    <li>Reach out to local shelters for ways to help</li>
                </ul>
            </div>
        </div>
    );
};


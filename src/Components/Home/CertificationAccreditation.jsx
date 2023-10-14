import React from 'react';

const CertificationAccreditation = () => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-semibold text-gray-900">Certification and Accreditation</h2>
                    <p className="text-lg text-gray-600">
                        Our courses are recognized and accredited by reputable institutions.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Certification 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Certified by University of Science</h3>
                        <p className="text-gray-700">
                            Our courses are accredited by the prestigious University of Science. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>

                    {/* Certification 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Industry-Recognized Certificates</h3>
                        <p className="text-gray-700">
                            Our instructors hold industry-recognized certificates and have extensive experience in their respective fields.
                        </p>
                    </div>

                    {/* Certification 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Compliance with International Education Standards</h3>
                        <p className="text-gray-700">
                            We adhere to international education standards to provide the highest quality education to our students.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificationAccreditation;

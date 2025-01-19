import React from 'react';

const LandingPage = () => {
    return (
        <div className="font-sans antialiased text-gray-800 max-lg:py-16 lg:min-h-screen flex justify-center items-center">
            <div className="container mx-auto px-4">
                <section className="hero text-center my-12">
                    <h2 className="text-3xl font-semibold mb-4">Your Journey Begins Here</h2>
                    <p className="text-lg mb-6">Build stunning web applications with our simple and flexible starter template.</p>
                    <a href="#" className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700">Get Started</a>
                </section>

                <section className="features grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="feature bg-gray-100 p-6 rounded-lg shadow text-center">
                        <h3 className="text-xl font-bold mb-3">Responsive Design</h3>
                        <p className="text-base">Optimized for all devices, ensuring a seamless user experience on desktops, tablets, and phones.</p>
                    </div>
                    <div className="feature bg-gray-100 p-6 rounded-lg shadow text-center">
                        <h3 className="text-xl font-bold mb-3">Easy to Customize</h3>
                        <p className="text-base">Modify components to suit your project needs with minimal effort and maximum flexibility.</p>
                    </div>
                    <div className="feature bg-gray-100 p-6 rounded-lg shadow text-center">
                        <h3 className="text-xl font-bold mb-3">Modern Aesthetics</h3>
                        <p className="text-base">Leverage clean and modern design principles to make your web projects visually appealing.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;

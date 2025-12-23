import { Link } from 'react-router-dom';
import { Heart, Leaf, Star, Sparkles, MessageCircle } from 'lucide-react';

const Landing = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-container">
                    <div className="hero-content">
                        <span className="subtitle">Handmade Collection</span>
                        <h1>Weave Stories <br /> Into Every Stitch</h1>
                        <p>Discover our exclusive collection of handcrafted crochet plushies, accessories, and home decor. Made with premium cotton and infinite love.</p>
                        <div className="hero-actions">
                            <Link to="/register" className="btn-primary">Start Exploring</Link>
                            <a href="#features" className="btn-outline">Learn More</a>
                        </div>
                    </div>
                    <div className="hero-image">
                        {/* Using a placeholder or one of the existing images if available in public */}
                        {/* Assuming images are in public/ or we need to move them. For now using a div placeholder or try to load one from backend static serve if we configured proxy? 
                 Actually, usually in Vite we put images in 'public' folder. 
                 I'll use a placeholder div or emoji for now to be safe, or inline SVG. */}
                        <div style={{ background: '#f0f0f0', width: '100%', height: '400px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '5rem' }}>🧶</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features section">
                <div className="container">
                    <h2 className="section-title">Why Choose Us?</h2>
                    <div className="features-grid">
                        <div className="card feature-card">
                            <div className="icon-box"><Heart size={32} color="#E6B8B8" /></div>
                            <h3>100% Handmade</h3>
                            <p>Every loop and stitch is created by hand, ensuring unique character in every piece.</p>
                        </div>
                        <div className="card feature-card">
                            <div className="icon-box"><Leaf size={32} color="#8DA399" /></div>
                            <h3>Eco-Friendly</h3>
                            <p>We use sustainable, recycled cotton yarns to protect our planet while crafting beauty.</p>
                        </div>
                        <div className="card feature-card">
                            <div className="icon-box"><Sparkles size={32} color="#FDCB6E" /></div>
                            <h3>Custom Orders</h3>
                            <p>Have a dream design? We collaborate with you to verify your vision into reality.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials section" style={{ background: 'white' }}>
                <div className="container">
                    <h2 className="section-title">Loved by You</h2>
                    <div className="testimonials-grid">
                        <div className="card testimonial-card">
                            <div className="stars flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#FDCB6E" color="#FDCB6E" />)}
                            </div>
                            <p>"The plushie I ordered for my niece is absolutely adorable. The craftsmanship is top-notch!"</p>
                            <h4>- Sarah Mitchell</h4>
                        </div>
                        <div className="card testimonial-card">
                            <div className="stars flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#FDCB6E" color="#FDCB6E" />)}
                            </div>
                            <p>"Beautiful packaging and even better product. You can feel the love put into it."</p>
                            <h4>- Emily Chen</h4>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Landing;

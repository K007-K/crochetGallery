const Footer = () => {
    return (
        <footer style={{ background: 'white', padding: '4rem 0 2rem', borderTop: '1px solid #eee', marginTop: 'auto' }}>
            <div className="container">
                <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', textAlign: 'left' }}>

                    <div>
                        <h3 style={{ marginBottom: '1rem' }}>CrochetGallery.</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Handcrafted with love using premium materials. bringing warmth to your life.</p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', color: '#666' }}>
                            <li style={{ marginBottom: '0.5rem' }}><a href="/">Home</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#about">About</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Contact</h4>
                        <p style={{ color: '#666', marginBottom: '0.5rem' }}>hello@crochetgallery.com</p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            {/* Social placeholders */}
                            <span style={{ width: '30px', height: '30px', background: '#eee', borderRadius: '50%' }}></span>
                            <span style={{ width: '30px', height: '30px', background: '#eee', borderRadius: '50%' }}></span>
                        </div>
                    </div>

                </div>
                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #f5f5f5', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                    &copy; 2025 CrochetGallery. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

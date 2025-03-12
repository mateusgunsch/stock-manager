const Product = require('../models/Product');

const seedProducts = async () => {
    try {
        await Product.deleteMany({}); // clear existing products
        const products = [
            { name: 'Smartphone Samsung Galaxy S23', price: 899.99, quantity: 50, description: 'Smartphone de última geração com tela de 6,1 polegadas, câmera de 50MP e processador Exynos 2200.' },
            { name: 'Laptop Dell XPS 13', price: 1099.99, quantity: 30, description: 'Laptop premium com tela de 13 polegadas, processador Intel i7 e 16GB de RAM.' },
            { name: 'Fones de Ouvido Bluetooth Sony WH-1000XM5', price: 349.99, quantity: 80, description: 'Fones de ouvido com cancelamento de ruído e bateria de até 30 horas de duração.' },
            { name: 'Smartwatch Apple Watch Series 8', price: 399.99, quantity: 40, description: 'Smartwatch com tela Retina de 45mm, monitoramento de saúde e resistência à água.' },
            { name: 'Câmera Canon EOS Rebel T8i', price: 749.99, quantity: 25, description: 'Câmera DSLR com 24,1 MP, gravação de vídeo em 4K e foco automático rápido.' },
            { name: 'Tablet Apple iPad Pro 12.9', price: 1199.99, quantity: 60, description: 'Tablet com tela Liquid Retina de 12,9 polegadas e chip M1 para alto desempenho.' },
            { name: 'TV 4K LG OLED C1', price: 1699.99, quantity: 35, description: 'TV OLED 4K de 55 polegadas com inteligência artificial e Dolby Vision.' },
            { name: 'Console PlayStation 5', price: 499.99, quantity: 45, description: 'Console de videogame com desempenho ultrarrápido e gráficos de última geração.' },
            { name: 'Notebook Apple MacBook Air M2', price: 999.99, quantity: 55, description: 'Notebook fino e leve com chip M2, 8GB de RAM e 256GB de armazenamento.' },
            { name: 'Microfone Blue Yeti', price: 129.99, quantity: 70, description: 'Microfone USB profissional ideal para streaming, gravações e podcasts.' },
            { name: 'Cadeira Gamer DXRacer Formula Series', price: 299.99, quantity: 20, description: 'Cadeira ergonômica para gamers com apoio para braços e ajuste de altura.' },
            { name: 'Mouse Razer DeathAdder V2', price: 69.99, quantity: 100, description: 'Mouse gamer com sensor óptico de 20.000 DPI e iluminação RGB personalizável.' },
            { name: 'Teclado Mecânico Logitech G Pro X', price: 129.99, quantity: 85, description: 'Teclado mecânico com switches intercambiáveis, ideal para jogos e produtividade.' },
            { name: 'Drone DJI Air 2S', price: 999.99, quantity: 15, description: 'Drone compacto com câmera 5.4K e autonomia de voo de até 31 minutos.' },
            { name: 'Power Bank Anker PowerCore 10000', price: 29.99, quantity: 120, description: 'Power bank portátil com 10.000mAh e suporte para carregamento rápido.' },
            { name: 'Smartphone iPhone 14', price: 999.99, quantity: 60, description: 'iPhone 14 com tela OLED de 6,1 polegadas e câmera de 12MP.' },
            { name: 'Tênis Nike Air Max 270', price: 129.99, quantity: 40, description: 'Tênis esportivo com design moderno e amortecimento Air Max para conforto.' },
            { name: 'Relógio Casio G-Shock', price: 89.99, quantity: 50, description: 'Relógio digital resistente à água e impacto, ideal para aventuras ao ar livre.' },
            { name: 'Chá Verde Twinings', price: 3.99, quantity: 150, description: 'Chá verde premium com sabor suave e refrescante, ideal para o bem-estar.' },
            { name: 'Cafeteira Nespresso Pixie', price: 149.99, quantity: 25, description: 'Cafeteira compacta para cápsulas Nespresso com design moderno e funcional.' },
            { name: 'Processador Intel Core i9-12900K', price: 799.99, quantity: 10, description: 'Processador de alto desempenho com 16 núcleos e 24 threads, ideal para tarefas pesadas.' },
            { name: 'Monitor Acer Predator XB271HU', price: 499.99, quantity: 40, description: 'Monitor gaming com resolução 1440p, taxa de atualização de 165Hz e tempo de resposta de 1ms.' },
            { name: 'Caixa de Som Bluetooth JBL Flip 5', price: 99.99, quantity: 60, description: 'Caixa de som portátil com som estéreo, resistência à água e bateria de até 12 horas.' },
            { name: 'Kit de Maquiagem Maybelline', price: 29.99, quantity: 80, description: 'Kit de maquiagem com produtos essenciais para um look impecável e duradouro.' },
            { name: 'Aspirador de Pó Robot iRobot Roomba 675', price: 299.99, quantity: 35, description: 'Aspirador robot com conexão Wi-Fi e capacidade de limpeza automática.' },
            { name: 'Geladeira Brastemp 420L', price: 999.99, quantity: 15, description: 'Geladeira com 420L de capacidade, compartimento de congelamento e sistema Frost Free.' },
            { name: 'Cafeteira Elétrica Oster', price: 59.99, quantity: 90, description: 'Cafeteira com capacidade para 12 xícaras e sistema de aquecimento rápido.' },
            { name: 'Ferro de Passar Philips Azur Elite', price: 79.99, quantity: 70, description: 'Ferro de passar com tecnologia de vapor avançada e base cerâmica para deslizar suavemente.' },
            { name: 'Secador de Cabelo Dyson Supersonic', price: 399.99, quantity: 30, description: 'Secador de cabelo com motor digital V9, tecnologia de controle de calor inteligente e design ergonômico.' },
            { name: 'Câmera de Segurança Ring Video Doorbell 4', price: 199.99, quantity: 25, description: 'Campainha com câmera de segurança, visão em 1080p, detecção de movimento e áudio bidirecional.' },
        ];        
        await Product.insertMany(products);
        console.log('Products seeded successfully');
    } catch (error) {
        console.error('Error seeding products:', error);
    }
};

module.exports = seedProducts;
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Shop Backend API',
        description: 'API documentation for Shop Backend',
    },
    host: 'localhost:5000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json'; // ✅ Đường dẫn phải đúng thư mục gốc
const endpointsFiles = ['./server.js']; // ✅ Đường dẫn tới file có router

swaggerAutogen()(outputFile, endpointsFiles, doc);

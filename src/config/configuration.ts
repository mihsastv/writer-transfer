export default () => ({
    mainPath: process.env.MAIN_PATH || __dirname,
    highWaterMark: parseInt(process.env.HIGH_WATERMARK) || 1000,
    natsUrl: process.env.NATS_URL || 'nats://localhost:4222',
    selectTransport: process.env.SELECT_TRANSPORT === 'WS'
});

import {NestFactory} from "@nestjs/core";
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import {AppModule} from "./server/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Blog API")
		.setDescription("The blog api description")
		.setVersion("1.0")
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				name: "JWT",
				description: "Enter JWT token",
				in: "header",
			},
			"jwt"
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	app.enableCors();
	await app.listen(process.env.PORT || 5000);
}
bootstrap();

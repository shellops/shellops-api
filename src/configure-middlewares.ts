import 'source-map-support/register';

import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { readFileSync } from 'fs-extra';
import * as helmet from 'helmet';
import { join } from 'path';


export function configureMiddlewares(app: NestExpressApplication) {

    app.enableCors();
    app.use(compression());
    app.use(helmet());


    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidNonWhitelisted: false,
            transformOptions: {
                excludeExtraneousValues: false,
                excludePrefixes: ['__'],
                enableImplicitConversion: true,
                enableCircularCheck: true
            }
        })
    );

    const options = new DocumentBuilder()
        .setTitle('SHELLOPS API')
        .setDescription(
            `Environment: ${process.env.NODE_ENV} - [Documentations](/docs)`
        )
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('swagger', app, document, {
        customCss: readFileSync(join(process.cwd(), './swagger/swagger.css')).toString(),
        customJs: 'swagger.js'
    });


}
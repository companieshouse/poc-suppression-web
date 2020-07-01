import { Post, Get, Res } from '@nestjs/common';
import { Navigation } from 'src/navigation/navigation';
import { Response } from 'express';

export class BaseController {

    constructor(
        private readonly template: string,
        private readonly navigation: Navigation
    ) { }

    @Post()
    public onPost(): Navigation {
        return this.navigation;
    }

    @Get()
    public onGet(@Res() response: Response): void {
        return response.render(
            this.template,
            {
                ...this.navigation
            }
        )
    }
}

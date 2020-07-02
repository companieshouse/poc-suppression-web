import { Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { NavigationControl } from '../navigation/navigation-control';

export type BasicControllerData = {
    template: string;
    navigation: NavigationControl;
}

export class BaseController<T = any> implements BasicControllerData {

    constructor(
        public readonly template: string,
        public readonly navigation: NavigationControl
    ) { }

    @Get()
    protected onGet(@Res() response: Response): void {
        return response.render(
            this.template,
            {
                ...this.navigation,
                ...this.onGetModelData() as any
            }
        )
    }

    public onGetModelData(): T {
        return {} as T
    }

}

import { Routes } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { UploadComponent } from './components/upload/upload.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: SearchComponent
    },
    {
        path: 'upload',
        component: UploadComponent
    },
];

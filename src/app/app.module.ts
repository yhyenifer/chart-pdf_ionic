import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PdfPageModule } from '../pages/pdf/pdf.module';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';

@NgModule({
	declarations: [ MyApp ],
	imports: [ BrowserModule, IonicModule.forRoot(MyApp), PdfPageModule ],
	bootstrap: [ IonicApp ],
	entryComponents: [ MyApp ],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		File,
		FileOpener
	]
})
export class AppModule {}

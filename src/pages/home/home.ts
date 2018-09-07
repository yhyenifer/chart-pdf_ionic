import { PdfPage } from './../pdf/pdf';
import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, ViewController, App, Platform } from 'ionic-angular';
import chartJs from 'chart.js';

// pdf
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	//	@ViewChild('barCanvas') barCanvas;
	@ViewChild('lineCanvas') lineCanvas;
	//	@ViewChild('pieCanvas') pieCanvas;
	//@ViewChild('doughnutCanvas') doughnutCanvas;

	//	barChart: any;
	lineChart: any;

	pdfObjet: any;
	//	pieChart: any;
	//	doughnutChart: any;

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		public appCtrl: App,
		public platform: Platform,
		public file: File,
		public fileOpener: FileOpener
	) {}

	ngAfterViewInit() {
		setTimeout(() => {
			//	this.barChart = this.getBarChart();
			this.lineChart = this.getLineChart();
		}, 150);
		// setTimeout(() => {
		// 	this.pieChart = this.getPieChart();
		// 	this.doughnutChart = this.getDoughnutChart();
		// }, 250);
	}

	getChart(context, chartType, data, options?) {
		return new chartJs(context, {
			data,
			options: {
				// title: {
				// 	display: true,
				// 	text: 'Titulo'
				// }
				legend: {
					display: false
				}
			},
			type: chartType
		});
	}

	// getBarChart() {
	// 	const data = {
	// 		labels: [ 'Vermelho', 'Azul', 'Amarelo', 'Verde', 'Roxo' ],
	// 		datasets: [
	// 			{
	// 				label: 'número de votos',
	// 				data: [ 12, 23, 15, 90, 5 ],
	// 				backgroundColor: [
	// 					'rgb(255, 0, 0)',
	// 					'rgb(20, 0, 255)',
	// 					'rgb(255, 230, 0)',
	// 					'rgb(0, 255, 10)',
	// 					'rgb(60, 0, 70)'
	// 				],
	// 				borderWidth: 1
	// 			}
	// 		]
	// 	};

	// 	const options = {
	// 		scales: {
	// 			yAxes: [
	// 				{
	// 					ticks: {
	// 						beginAtZero: true
	// 					}
	// 				}
	// 			]
	// 		}
	// 	};

	// 	return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
	// }

	getLineChart() {
		const data = {
			labels: [ '0s', '7s', '13s', '67s' ], // eje x
			datasets: [
				// {
				// 	//label: 'Meu Dataset',
				// 	fill: false,
				// 	lineTension: 0.1,
				// 	backgroundColor: 'rgb(0, 178, 255)',
				// 	borderColor: 'rgb(231, 205, 35)',
				// 	borderCapStyle: 'butt',
				// 	borderJoinStyle: 'miter',
				// 	pointRadius: 1,
				// 	pointHitRadius: 10,
				// 	data: [ 0, 15, 98, 4 ],
				// 	scanGaps: false
				// },
				{
					label: 'Caida Libre',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'transparent',
					borderWidth: 3,
					borderColor: 'rgb(0,0,0)',
					// borderCapStyle: 'round', //but , round, square -- termina la linea
					// borderJoinStyle: 'round', // "bevel" || "round" || "miter"; -- curvas
					pointRadius: 1,
					pointHitRadius: 20,
					data: [ 0, 7, 7, 7 ], // eje y
					scanGaps: true
				}
			]
		};

		return this.getChart(this.lineCanvas.nativeElement, 'line', data);
	}

	// getPieChart() {
	// 	const data = {
	// 		labels: [ 'Vermelho', 'Azul', 'Amarelo' ],
	// 		datasets: [
	// 			{
	// 				data: [ 300, 75, 224 ],
	// 				backgroundColor: [ 'rgb(200, 6, 0)', 'rgb(36, 0, 255)', 'rgb(242, 255, 0)' ]
	// 			}
	// 		]
	// 	};

	// 	return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
	// }

	// getDoughnutChart() {
	// 	const data = {
	// 		labels: [ 'Vermelho', 'Azul', 'Amarelo' ],
	// 		datasets: [
	// 			{
	// 				label: 'Teste Chart',
	// 				data: [ 12, 65, 32 ],
	// 				backgroundColor: [ 'rgb(0, 244, 97)', 'rgb(37, 39, 43)', 'rgb(255, 207, 0)' ]
	// 			}
	// 		]
	// 	};

	// 	return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', data);
	// }

	openPage() {
		//

		this.navCtrl.setRoot(PdfPage);
	}

	generatePDF() {
		let pdfDefinition = {
			content: [
				{
					text: 'Bitacora de Laboratorio',
					style: 'header',
					alignment: 'center'
				},
				{
					text: 'Caida Libre\n\n',
					style: 'subheader',
					alignment: 'center'
				},

				{
					text: [
						'This paragraph uses header style and overrides bold value setting it back to false.',
						'Header style in this example sets alignment to justify, so this paragraph should be rendered. \n\n\n'
					],
					style: 'subheader',
					bold: false
				},
				{
					text: 'Medidas:\n',
					style: 'subheader'
				},
				{
					style: 'tableExample',
					table: {
						body: [
							[
								{ text: 'Altura', style: 'tableHeader' },
								{ text: 'Tiempo', style: 'tableHeader' }
							],
							[ '7', '0,2' ],
							[ '7', '0,2' ],
							[ '7', '0,2' ],
							[ '7', '0,2' ]
						]
					}
				},
				// grafica
				{
					text: 'Gráfica:\n\n\n\n\n\n\n\n',
					style: 'subheader'
				},

				// integrantes del grupo
				{
					text: 'Integrantes del Grupo:\n',
					style: 'subheader'
				},
				{
					text: 'Yenifer Hernandez - Mauricio Uribe\n\n\n\n\n\n\n\n\n\n',
					style: 'subheader',
					bold: false
				},

				{
					text: 'Bitácora generada por ATOME - Universidad del Quindío',
					alignment: 'center',
					bold: false
				}
			],
			styles: {
				header: {
					fontSize: 20,
					bold: true
				},
				subheader: {
					fontSize: 18,
					bold: true,
					alignment: 'justify'
				},
				tableExample: {
					margin: [ 200, 5 ],
					alignment: 'center'
				},
				tableHeader: {
					bold: true,
					fontSize: 18,
					color: 'black'
				}
			}
		};
		// cosntruccion del pdf y descarga
		this.pdfObjet = pdfMake.createPdf(pdfDefinition);
		this.openFile();
	}

	openFile() {
		if (this.platform.is('cordova')) {
			console.log('es telefono');
			this.platform.ready().then(() => {
				this.pdfObjet.getBuffer((buffer) => {
					var blob = new Blob([ buffer ], { type: 'application/pdf' });
					this.file
						.writeFile(this.file.dataDirectory, 'Bitacora.pdf', blob, { replace: true })
						.then((fileEntry) => {
							this.fileOpener.open(
								this.file.dataDirectory + 'Bitacora.pdf',
								'application/pdf'
							);
						});
				});
				console.log('es telefono2');
				return true;
			});
		}

		this.pdfObjet.download();
	}
}

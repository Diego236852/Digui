import ficha1 	from './../images/Domino/Ficha 1.svg';
import ficha2 	from './../images/Domino/Ficha 2.svg';
import ficha3 	from './../images/Domino/Ficha 3.svg';
import ficha4 	from './../images/Domino/Ficha 4.svg';
import ficha5 	from './../images/Domino/Ficha 5.svg';
import ficha6 	from './../images/Domino/Ficha 6.svg';
import ficha7 	from './../images/Domino/Ficha 7.svg';
import ficha8 	from './../images/Domino/Ficha 8.svg';
import ficha9		from './../images/Domino/Ficha 9.svg';
import ficha10 	from './../images/Domino/Ficha 10.svg';
import ficha11 	from './../images/Domino/Ficha 11.svg';
import ficha12 	from './../images/Domino/Ficha 12.svg';
import ficha13 	from './../images/Domino/Ficha 13.svg';
import ficha14 	from './../images/Domino/Ficha 14.svg';
import ficha15 	from './../images/Domino/Ficha 15.svg';
import ficha16 	from './../images/Domino/Ficha 16.svg';
import ficha17 	from './../images/Domino/Ficha 17.svg';
import ficha18 	from './../images/Domino/Ficha 18.svg';
import ficha19 	from './../images/Domino/Ficha 19.svg';
import ficha20 	from './../images/Domino/Ficha 20.svg';
import ficha21 	from './../images/Domino/Ficha 21.svg';
import ficha22 	from './../images/Domino/Ficha 22.svg';
import ficha23 	from './../images/Domino/Ficha 23.svg';
import ficha24 	from './../images/Domino/Ficha 24.svg';
import ficha25 	from './../images/Domino/Ficha 25.svg';
import ficha26 	from './../images/Domino/Ficha 26.svg';
import ficha27 	from './../images/Domino/Ficha 27.svg';
import ficha28 	from './../images/Domino/Ficha 28.svg';


const imageDatabase = [
	{ src: ficha1, 	leftNumber: 1, leftShape: 'circle', 	leftColor: 'purple', 		rightNumber: 2, rightShape: 'heart', 		rightColor: 'turquoise' },
	{ src: ficha2, 	leftNumber: 2, leftShape: 'heart', 		leftColor: 'yellow', 		rightNumber: 4, rightShape: 'square', 	rightColor: 'red' 			},
	{ src: ficha3, 	leftNumber: 4, leftShape: 'square', 	leftColor: 'purple', 		rightNumber: 4, rightShape: 'square', 	rightColor: 'red' 			},
	{ src: ficha4, 	leftNumber: 0, leftShape: 'nothing', 	leftColor: 'nothing', 	rightNumber: 2, rightShape: 'heart', 		rightColor: 'turquoise' },
	{ src: ficha5, 	leftNumber: 0, leftShape: 'nothing', 	leftColor: 'nothing', 	rightNumber: 4, rightShape: 'square', 	rightColor: 'orange' 		},
	{ src: ficha6, 	leftNumber: 4, leftShape: 'square', 	leftColor: 'yellow', 		rightNumber: 6, rightShape: 'star', 		rightColor: 'purple' 		},
	{ src: ficha7, 	leftNumber: 5, leftShape: 'triangle', leftColor: 'orange', 		rightNumber: 5, rightShape: 'triangle', rightColor: 'turquoise' },
	{ src: ficha8, 	leftNumber: 1, leftShape: 'circle', 	leftColor: 'turquoise', rightNumber: 6, rightShape: 'star', 		rightColor: 'red' 			},
	{ src: ficha9, 	leftNumber: 3, leftShape: 'moon', 		leftColor: 'orange', 		rightNumber: 6, rightShape: 'star', 		rightColor: 'turquoise' },
	{ src: ficha10,	leftNumber: 6, leftShape: 'star', 		leftColor: 'green', 		rightNumber: 6, rightShape: 'star', 		rightColor: 'orange' 		},
	{ src: ficha11, leftNumber: 2, leftShape: 'heart', 		leftColor: 'red', 			rightNumber: 5, rightShape: 'triangle', rightColor: 'green' 		},
	{ src: ficha12, leftNumber: 1, leftShape: 'circle', 	leftColor: 'green', 		rightNumber: 1, rightShape: 'circle', 	rightColor: 'green' 		},
	{ src: ficha13, leftNumber: 3, leftShape: 'moon', 		leftColor: 'green', 		rightNumber: 3, rightShape: 'moon', 		rightColor: 'purple' 		},
	{ src: ficha14, leftNumber: 0, leftShape: 'nothing', 	leftColor: 'nothing', 	rightNumber: 5, rightShape: 'triangle', rightColor: 'red' 			},
	{ src: ficha15, leftNumber: 1, leftShape: 'circle', 	leftColor: 'red', 			rightNumber: 5, rightShape: 'triangle', rightColor: 'yellow' 		},
	{ src: ficha16, leftNumber: 3, leftShape: 'moon', 		leftColor: 'red', 			rightNumber: 5, rightShape: 'triangle', rightColor: 'turquoise' },
	{ src: ficha17, leftNumber: 1, leftShape: 'circle', 	leftColor: 'purple', 		rightNumber: 4, rightShape: 'square', 	rightColor: 'green' 		},
	{ src: ficha18, leftNumber: 3, leftShape: 'moon', 		leftColor: 'yellow', 		rightNumber: 4, rightShape: 'square', 	rightColor: 'purple' 		},
	{ src: ficha19, leftNumber: 2, leftShape: 'heart', 		leftColor: 'green', 		rightNumber: 3, rightShape: 'moon', 		rightColor: 'turquoise' },
	{ src: ficha20, leftNumber: 0, leftShape: 'nothing', 	leftColor: 'nothing', 	rightNumber: 6, rightShape: 'star', 		rightColor: 'yellow' 		},
	{ src: ficha21, leftNumber: 0, leftShape: 'nothing', 	leftColor: 'nothing', 	rightNumber: 0, rightShape: 'nothing', 	rightColor: 'nothing' 	},
	{ src: ficha22, leftNumber: 4, leftShape: 'square', 	leftColor: 'green', 		rightNumber: 5, rightShape: 'triangle', rightColor: 'turquoise' },
	{ src: ficha23, leftNumber: 0, leftShape: 'nothing', 	leftColor: 'nothing', 	rightNumber: 3, rightShape: 'moon', 		rightColor: 'purple' 		},
	{ src: ficha24, leftNumber: 0, leftShape: 'nothing', 	leftColor: 'nothing', 	rightNumber: 1, rightShape: 'circle', 	rightColor: 'green' 		},
	{ src: ficha25, leftNumber: 2, leftShape: 'heart', 		leftColor: 'orange', 		rightNumber: 6, rightShape: 'star', 		rightColor: 'turquoise' },
	{ src: ficha26, leftNumber: 1, leftShape: 'circle', 	leftColor: 'orange', 		rightNumber: 3, rightShape: 'moon', 		rightColor: 'turquoise' },
	{ src: ficha27, leftNumber: 5, leftShape: 'triangle', leftColor: 'purple', 		rightNumber: 6, rightShape: 'star', 		rightColor: 'red' 			},
	{ src: ficha28, leftNumber: 2, leftShape: 'heart', 		leftColor: 'red', 			rightNumber: 2, rightShape: 'heart', 		rightColor: 'turquoise' },
];


export default imageDatabase;
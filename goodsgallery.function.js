;(function() {
	'use strict';

	class Gallery {
		constructor(gallery) {
			// контейнер для маленьких картинок (тумб)
			this.thumbsBox = gallery.querySelector('.thumbs');
			// коллекция маленьких картинок (тумб)
			this.thumbs = this.thumbsBox.querySelectorAll('img');
			// объект, в который будем выводить большую картинку
			this.image = gallery.querySelector('.photo-box img');
			// объект (родительский элемент), содержащий кнопки навигации
			this.control = gallery.querySelector('.control-row');
			// кол-во фотографий в галереи
			this.count = this.thumbs.length;
			// индекс отображаемой фотографии, при инициализации скрипта
			// он по умолчанию равен 0
			this.current = 0;
			// регистрируем обработчики событий на странице с фотогалерей 
			this.registerEventsHandler();
		}

		// регистрация обработчиков событий
		registerEventsHandler(e) {
			// клик по контейнеру '.control-box', в котором находятся кнопки 
			// управления
			this.control.addEventListener('click', this.buttonControl.bind(this));
			// клик по большой картинке
			this.image.addEventListener('click', this.imageControl.bind(this));
			// вращение колёсика мыши
			this.image.addEventListener('wheel', this.wheelControl.bind(this));
			// управление стрелками 'влево' и 'вправо'
			document.addEventListener('keydown', this.keyControl.bind(this));
			// клик по тумбе
			this.thumbsBox.addEventListener('click', this.thumbControl.bind(this));
		}

		buttonControl(e) {
			// если click был сделан вне кнопок, прекращаем работу функции
			if (e.target.tagName != 'BUTTON2') return;
			const ctrl = e.target.dataset.control;
			// каждому свойству объекта соотвествует формула расчёта
			// индекса, учитывающая кол-во фотографий и текущий индекс
			let argControl = {
				first: 0,
				last: this.count - 1,
				prev: (this.count + this.current - 1) % this.count,
				next: (this.current + 1) % this.count
			};
			// индекс следующей фотографии, в зависимости от функционала
			// кнопки навигации
			const i = argControl[ctrl];
			this.showPhoto(i);
		}

		imageControl(e) {
			// показываем следующее фото
			this.showPhoto((this.current + 1) % this.count);
		}

		wheelControl(e) {
			// отключаем поведение по умолчанию - скролл страницы
			e.preventDefault();

			let i = (e.deltaY > 0) ? (this.current + 1) % this.count : (this.count + this.current - 1) % this.count;
			this.showPhoto(i)
		}

		keyControl(e) {
			// отключаем действия по умолчанию
			e.preventDefault();
			// код нажатой клавиши
			const code = e.which;
			// если код клавиши не соотвествует коду клавиш вправо или влево,
			// то прекращаем работу функции
			if (code != 37 && code != 39) return;

			// каждому свойству объекта соотвествует формула расчёта
			// индекса, учитывающая кол-во фотографий и текущий индекс
			let argControl = {
				37: (this.count + this.current - 1) % this.count,
				39: (this.current + 1) % this.count
			}
			this.showPhoto(argControl[e.which]);
		}

		thumbControl(e) {
			const target = e.target;
			if (target.tagName != 'IMG') return;
			// Array.from(this.thumbs) преобразует коллекцию в массив
			// const i = Array.from(this.thumbs).indexOf(target);
			// вариант 2, [].indexOf.call - одалживание метода indexOf
			const i = [].indexOf.call(this.thumbs, target);
			this.showPhoto(i);
		}

		showPhoto(i) {
			// используя полученный в качестве аргумента индекс
			// получаем 'src' тумбы в коллекции
			const src = this.thumbs[i].getAttribute('src');
			// полученный 'src' прописываем у большой картинки, предварительно
			// изменив путь (название папки)
			this.image.setAttribute('src', src.replace('thumbnails', 'photos'));
			// устанавливаем текущий индекс равным индексу тумбы в коллекции
			this.current = i;
		}
	}

	// выбираем все фотогалереи на странице
	const galleries = document.querySelectorAll('[data-gallary]');
	// перебираем полученную коллекцию элементов
	for (let gallery of galleries) {
		// создаём экземпляр фотогалереи товаров для интернет-магазина
		const goodsgallery = new Gallery(gallery);
	}
})();

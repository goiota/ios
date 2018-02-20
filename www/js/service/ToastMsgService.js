goiotaAppService.service("ToastMsgService", function ($rootScope,$translate) {

	var toastService = this;




	this.error = function (aCode) {

		$translate(aCode).then(function (translation) {
			iziToast.error({
		      title: '',
		      message: translation,
		      position: 'topCenter',
		      timeout:2500,
		      animateInside: false,
		      transitionIn: 'fadeInDown',
		      transitionOut: 'fadeOutUp',
		      transitionInMobile: 'fadeInDown',
		      transitionOutMobile: 'fadeOutUp',
		      close: false,
		      backgroundColor: 'rgba(255, 4, 4, 0.5)',
		      titleColor: '#fff',
		      messageColor: '#fff',
					icon: '',
					iconColor:'#fff'
		  });
		});

	};

	this.success = function (aTitle,aMessage) {


		iziToast.success({
	      title: aTitle,
	      message: aMessage,
	      position: 'topCenter',
	      timeout:2500,
	      animateInside: false,
	      transitionIn: 'fadeInDown',
	      transitionOut: 'fadeOutUp',
	      transitionInMobile: 'fadeInDown',
	      transitionOutMobile: 'fadeOutUp',
	      close: false,
	      backgroundColor: '#70d447',
	      titleColor: '#fff',
	      messageColor: '#fff',
				icon: '',
				iconColor:'#fff'
	  });


	};


	this.warning = function (aTitle,aMessage) {


		iziToast.warning({
	      title: aTitle,
	      message: aMessage,
	      position: 'topCenter',
	      timeout:2500,
	      animateInside: false,
	      transitionIn: 'fadeInDown',
	      transitionOut: 'fadeOutUp',
	      transitionInMobile: 'fadeInDown',
	      transitionOutMobile: 'fadeOutUp',
	      close: false,
	      backgroundColor: '#F5E859',
	      titleColor: '#fff',
	      messageColor: '#fff',
				icon: '',
				iconColor:'#fff'
	  });


	};


	this.info = function (aCode) {

		$translate(aCode).then(function (translation) {
			iziToast.info({
		      title: '',
		      message: translation,
		      position: 'topCenter',
		      timeout:2500,
		      animateInside: false,
		      transitionIn: 'fadeInDown',
		      transitionOut: 'fadeOutUp',
		      transitionInMobile: 'fadeInDown',
		      transitionOutMobile: 'fadeOutUp',
		      close: false,
		      backgroundColor: '#f9d552',
		      titleColor: '#fff',
		      messageColor: '#fff',
					icon: '',
					iconColor:'#fff'
		  });
		});

	};




});

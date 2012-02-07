
gh-pages:
	rm -f ../slider-gh-pages/assets/*
	cp -r css ../slider-gh-pages/assets/
	cp -r js ../slider-gh-pages/assets/


.PHONY: dist gh-pages
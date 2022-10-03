# Ionic Picture Gallery

An basic picture gallery progressive web app (PWA) for Web, Android and iOS based on the
[Ionic v6 Build Your First App](https://ionicframework.com/docs/angular/your-first-app)
guide, but with a few extensions, such as:
- Details page and navigation
- Back button
- Rename picture functionality
- Picture slider using [Swiper.js](https://swiperjs.com/)
- Service worker with _Install app_ prompt
- Toast notifications
- Debug tab to show currently used platform

### Demo

Check out the app: https://ionic-picture-gallery.web.app

### Getting started

To run the app in your web browser, simply run the following command in your terminal:

```
ionic serve
```

And to create a manual build, run:

```
ionic build
```

### Mobile

To copy the latest build to the mobile project:

```
ionic cap copy
```

And to sync the data the other way round, such as after making updates to the native portion of the code (e.g. adding a new plugin):

```
ionic cap sync
```

To open the respective mobile app project:

```
ionic cap open android
ionic cap open ios
```

And finally, to run the app using live reload on mobile:

```
ionic cap run android -l --external
ionic cap run ios -l --external
```

### Deployment

First create a production build:

```
ionic build --prod
```

The production build created in the `build` folder can then be deployed, such as via Firebase Hosting and its `firebase deploy` command.

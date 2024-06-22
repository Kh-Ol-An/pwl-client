export {};

self.addEventListener('push', function(event: PushEvent) {
    const data = event.data?.json();
    const options = {
        body: data.body,
        icon: '@assets/images/logo.svg',
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

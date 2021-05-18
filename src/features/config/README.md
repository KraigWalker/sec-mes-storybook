# Config

Handles the logic required.

Many apps will refrain from mounting until they retrieve a config – typically by fetching a `config.json` that is injected into the app by Chieftain during deployment.

This typically creates a risk that if the config fails to load, either because of an outage, not found, or a temporary drop in our Customer's connection, they will see nothing but a dreaded "White Screen of Doom."

To avoid this, we allow the app to start rendering without a config. It still remains unusable, but will improve the percieved responsiveness of the app. Because the app will be able to track the state of fetching the config, if an error occurs, we can resort to displaying an adequate error message, or take the opportunity to retry.

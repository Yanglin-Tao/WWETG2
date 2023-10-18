# -*- coding: utf-8 -*-
"""WSGI application initialization for wwetg2app."""
from wwetg2app.config.app_cfg import base_config
from wwetg2app.config.cors_middleware import CORSMiddleware

__all__ = ['make_app']


def make_app(global_conf, **app_conf):
    """
    Set wwetg2app up with the settings found in the PasteDeploy configuration
    file used.

    :param dict global_conf: The global settings for wwetg2app
                             (those defined under the ``[DEFAULT]`` section).

    :return: The wwetg2app application with all the relevant middleware
        loaded.

    This is the PasteDeploy factory for the wwetg2app application.

    ``app_conf`` contains all the application-specific settings (those defined
    under ``[app:main]``.
    """
    app = base_config.make_wsgi_app(global_conf, app_conf, wrap_app=None)

    # Wrap your final TurboGears 2 application with custom middleware here
    app = CORSMiddleware(app, origins='*')

    return app

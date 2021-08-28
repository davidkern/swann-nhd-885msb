# Swann NHD-885MSB

It seems there is a universal rule that all IP connected security cameras
must be full of security vulnerabilities.

This one is no different - poor code quality, requires browsers which are
long since unsupported, and needs you to run an executable to install
ocx/dll to be able to use it at all.

But it seems to support RTSP (at least it has the port open).

This is a dump from the web interface of the camera, so I can reverse
engineer the dlls and figure out how to authenticate to the RTSP port.

## RTSP Url

rtsp://[ip]:554/ch1/00

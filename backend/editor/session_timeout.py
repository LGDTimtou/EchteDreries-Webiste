import threading

_session_timers = {}


class SessionTimer:
    def __init__(self, timeout_seconds, on_timeout):
        self.timeout_seconds = timeout_seconds
        self.on_timeout = on_timeout
        self.start()

    def start(self):
        self.timer = threading.Timer(self.timeout_seconds, self.on_timeout)
        self.timer.start()

    def cancel(self):
        self.timer.cancel()

    def reset(self):
        self.cancel()
        self.start()


def start_session_timer(secret, timeout_seconds, on_timeout):
    _session_timers[str(secret)] = SessionTimer(timeout_seconds, on_timeout)


def cancel_session_timer(secret):
    timer = _session_timers.pop(str(secret), None)
    if timer:
        timer.cancel()


def reset_session_timer(secret):
    if str(secret) not in _session_timers:
        return

    _session_timers[str(secret)].reset()

class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Método para adicionar um ouvinte de evento
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // Método para remover um ouvinte de evento
  off(event, listenerToRemove) {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }

  // Método para emitir um evento
  emit(event, data) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach(listener => listener(data));
  }
}

export default EventEmitter;
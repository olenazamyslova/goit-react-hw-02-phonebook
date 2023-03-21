import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    this.repeatControl(data);
  };

  repeatControl = (data) => {
    const { contacts } = this.state;
    const isExist = contacts.find((contact) => contact.name === data.name);
    if (isExist) {
      alert("Контакт вже є у телефонній книзі!!!");
      return;
    };

    const newContact = {
      id: uuidv4(),
      name: data.name,
      number: data.number,
    };
    this.setState((prevState) => ({
      ...prevState,
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContactFromContactList = (idContact) => {
    this.setState((prevState) => {
      return { contacts: prevState.contacts.filter(elem => elem.id !== idContact) };
    });
  };

  setFilterToState = filterData => {
    this.setState({ filter: filterData });
  };

  filterArr = fArr => {
    let newArr = fArr.filter(cur =>
      cur.name.toUpperCase().includes(this.state.filter.toUpperCase())
    );
    return newArr;
  };

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmitData={this.formSubmitHandler} />
        <h1>Contacts</h1>
        <Filter setFilterToState={this.setFilterToState} />
        <ContactList
          contacts={this.filterArr(this.state.contacts)}
          del={this.deleteContactFromContactList}
        />
      </div>
    );
  }
}

export default App;


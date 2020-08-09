import React,{useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import{useHistory}from 'react-router-dom';

function TeacherFrom(){
    const history= useHistory();
    const [name, setName]=useState('');
    const [avatar, setAvatar]=useState('');
    const [whatsapp, setWatsApp]=useState('');
    const [bio, setBio]=useState('');

    const [subject, setSubject]=useState('');
    const [cost, setCost]=useState('');

    const [scheduleItems,setScheduleItems]=useState([
        {week_day:20,from:'',to:''}
    ]);

    function addNewSchudleItems(){
        setScheduleItems([
            ...scheduleItems,
            {week_day:0,from:'',to:''}
        ])
    }

    function setScheduleItemVelue(position: number, field: string,value:string){
        const updatedScheduleItems=scheduleItems.map((scheduleItem,index)=>{
            if (index===position){
                return {...scheduleItem, [field]: value};
            }
            return scheduleItem;
        });
        setScheduleItems(updatedScheduleItems);
    }

    function handleCreatClass(e: FormEvent){
        e.preventDefault();
        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost:Number(cost),
            schedule: scheduleItems
        }).then(()=>{
            alert('cadastrado com sucesso!');
            history.push('/');
        }).catch(()=>{
            alert("Erro ao cadastrar");
        })
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrivel qeu você quer dar aulas."
                        description="O primeiro passo é preencher esse formulario de inscrição."
            >
            </PageHeader>

            <main>
                <form onSubmit={handleCreatClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                        name="name"
                        label="Nome Completo"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        />
                        
                        <Input 
                        name="avatar"
                        label="Avatar"
                        value={avatar}
                        onChange={(e)=>{setAvatar(e.target.value)}}
                        />
                        
                        <Input 
                        name="whatsapp"
                        label="WhatsApp"
                        value={whatsapp}
                        onChange={(e)=>{setWatsApp(e.target.value)}}
                        />

                        <Textarea 
                        name="bio"
                        label="Biografia"
                        value={bio}
                        onChange={(e)=>{setBio(e.target.value)}}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a Aula</legend>
                        <Select 
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e)=>{setSubject(e.target.value)}}
                        options={[
                            {value:'Artes', label:'Artes'},
                            {value:'Biologia', label:'Biologia'},
                            {value:'Ciências', label:'Ciências'},
                            {value:'Educação Física', label:'Educação Física'},
                            {value:'Física', label:'Física'},
                            {value:'Geografia', label:'Geografia'},
                            {value:'Matemática', label:'Matemática'},
                            {value:'Química', label:'Química'},
                            {value:'Português', label:'Português'},
                            {value:'Programação', label:'Programação'},
                        ]}
                        />
                        <Input 
                        name="cost" 
                        label="Custo da sua aula por hora"
                        value={cost}
                        onChange={(e)=>{setCost(e.target.value)}}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponíveis
                            <button type="button" onClick={addNewSchudleItems}>
                                +Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem,index)=>{
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                    name="week_day"
                                    label="Dia da Semana"
                                    value={scheduleItem.week_day}
                                    onChange={e=>setScheduleItemVelue(index,'week_day',e.target.value)}
                                    options={[
                                        {value:'0', label:'Domingo'},
                                        {value:'1', label:'Segunda-Feira'},
                                        {value:'2', label:'Terça-Feira'},
                                        {value:'3', label:'Quarta-Feira'},
                                        {value:'4', label:'Quinta-Feira'},
                                        {value:'5', label:'Sexta-Feixa'},
                                        {value:'6', label:'Sabado'}
                                    ]}
                                    />
                                    <Input 
                                    name="from"
                                    label="Das"
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={e=>setScheduleItemVelue(index,'from',e.target.value)}
                                    />
                                    <Input 
                                    name="to"
                                    label="Até"
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={e=>setScheduleItemVelue(index,'to',e.target.value)}
                                    />  

                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importente! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar Cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherFrom;
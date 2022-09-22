import axios from "axios"
import { useForm } from "react-hook-form"

/**
 * Form Eksempel
 * @param {*} param0 
 * @returns 
 */
const ExampleForm = ({ item_id }) => {
  // Destructor Item
  const { register, handleSubmit, formState: { errors } } = useForm()

  /**
   * Funktion til at sende formular med
   * @param {object} data Objekt med input værdier 
   * @param {object} e Objekt med event værdier
   */
  const submitForm = async (data, e) => {
    const endpoint = "https://api.mediehuset.net/snippets/comments" // Sætter var med endpoint
    const formData = new FormData(e.target) // Kalder instans af formdata med event target (som er form objektet)
    console.log(...formData) // Log en spread af formdata
    const result = await axios.post(endpoint, formData) // Kalder API'et
    if(result) {
      // Hvis formen bliver sendt skal der sendes en besked til brugeren
      console.log('Formen er sendt');
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* Skjult input med id til det element der skal kommenteres på */}
      <input type="hidden" value={item_id} {...register("item_id")} />
      <div>
        <label htmlFor="title">Input titel</label>
        {/* Tekst input til titel */}
        <input type="text" {...register("title", { required: true })} />
        {/* Validering til tekst input */}
        {errors.title && <span>Du skal skrive en titel</span>}
      </div>
      <div>
        <label htmlFor="comment">Input Kommentar</label>
        {/* Tekst area input til kommentar */}
        <textarea {...register("comment", { required: true })} />
        {/* Validering af kommentar felt */}
        {errors.comment && <span>Du skal skrive en kommentar</span>}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

export { ExampleForm }

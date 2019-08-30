import $ {
  <%= component %>
} from 'XXX'
export default {
  name: '<%= name %>' ,
  components: {
    <%= component %> ,
  },
  props: {},
  data() {
    return {}
  },
  methods: {},
  render(h) {
    return h(<%= component %>, {})
  },
}
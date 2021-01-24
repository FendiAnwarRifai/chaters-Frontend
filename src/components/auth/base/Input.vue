<template>
    <div>
        <input @input="$emit('input', $event.target.value)" @keyup="$emit('keyup', $event)" :type="type" :id="id" :placeholder="placeholder" :value="value" :class="className" class="form-control inputs" required>
    </div>
</template>

<script>
export default {
  name: 'InputAuth',
  props: ['id', 'type', 'placeholder', 'className', 'value']
}
</script>

<style scoped>
.inputs{
  font-size: 16px;
  outline:0;
  border-width: 0 0 2px;
  border-color: rgba(169, 169, 169, 0.8);
  border-radius: 0;
}
.inputs:focus{
  box-shadow: inset 0 -1px 0 #ddd;
}
::placeholder {
    color: rgba(169, 169, 169, 0.8) !important;
    font-size: 14px;
  }
</style>

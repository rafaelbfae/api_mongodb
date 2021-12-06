const express = require('express');
const router = express.Router();

const client = require('../models/client')

router.get('/client', async (_, res) => {
    /*
    #swagger.description = 'Endpoint para consulta de cliente.'
    */

  try {
    res.status(200).send(result)
    
  } catch(error) {
    res.status(500).send('Internal Server Error');
  }

});

router.get('/client/:id', async (req, res) => {
    /*
    #swagger.description = 'Endpoint para consulta de cliente por id.'
    */

    /*
    #swagger.parameters['id'] = {
        description: 'Id do Cliente',
        type: 'string',
        required: true,
        in: 'path',
        example: '61ae6508bc916ae4027da93e',
    }
    */
  try {
    const { id } = req.params.id;
  
    var result = await client.get(id)
    
    if (id) {
        if (result.length <= 0) {
            res.status(404).send('Cliente não localizado')
        }
        res.status(200).send(result[0])
    }
    else {
        res.status(200).send(result)
    }
    
  } catch(error) {
    res.status(500).send('Internal Server Error');
  }

});

router.post('/client', async (req, res) => {
    /*
    #swagger.description = 'Endpoint para cadastro de cliente.'
    */

    /*  
    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Dados do cliente',
            schema: {
                $name: 'Cliente numero 1',
                $cpf: '999.888.777-66',
                $phone: '(48) 9 8877-2211'
            }
    } */
    try {
        var result = await client.save(req.body)
        if (result[0] === false) {
            res.status(400).send(result[1])
        }
        else {
            res.status(200).send(result[1])
        }
    }
    catch(err) {
        res.status(500).send('Internal Server Error')
    }
})

router.put('/client/:id', async (req, res) => {
    /*
    #swagger.description = 'Endpoint para atualização de dados do cliente.'
    */

    /*
    #swagger.parameters['id'] = {
        description: 'Id do Cliente',
        type: 'string',
        required: true,
        in: 'path',
        example: '61ae6508bc916ae4027da93e',
    }
    */

    /*  
    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Dados do cliente',
            schema: {
                $name: 'Cliente numero 1',
                $cpf: '999.888.777-66',
                $phone: '(48) 9 8877-2211'
            }
    } */
    try {
        if (!req.params.id) {
            res.status(400).send('Id do cliente não foi informado.')
            return ;
        }

        var c = await client.get(req.params.id)

        if (!c) {
            res.status(400).send('Cliente não localizado')
            return ;
        }
        c = Object.assign(c, req.body)

        var result = await client.update(c)
        if (result[0] === false) {
            res.status(400).send(result[1])
        }
        else {
            res.status(200).send(result[1])
        }
    }
    catch(err) {
        res.status(500).send('Internal Server Error')
    }
})

router.delete('/client/:id', async (req, res) => {
    /*
    #swagger.description = 'Endpoint para excluir cliente.'
    */

    /*
    #swagger.parameters['id'] = {
        description: 'Id do Cliente',
        type: 'string',
        required: true,
        in: 'path',
        example: '61ae6508bc916ae4027da93e',
    }
    */

    /*
    #swagger.parameters['schedule_id'] = {
        description: 'Id do Agendamento',
        type: 'string',
        required: true,
        in: 'path',
        example: '61ae6508bc916ae4027da93e',
    }
    */

    try {
        if (!req.params.id) {
            res.status(400).send('Id do cliente não foi informado.')
            return ;
        }

        var c = await client.get(req.params.id)

        if (!c) {
            res.status(400).send('Cliente não localizado')
            return ;
        }

        var result = await client.delete(req.params.id)

        if (result[0] === false) {
            res.status(400).send(result[1])
        }
        else {
            res.status(200).send('Cliente excluido')
        }
    }
    catch(err) {
        res.status(500).send('Internal Server Error')
    }
})

router.post('/client/:id/schedule', async(req, res) => {
    /*
    #swagger.description = 'Endpoint para agendar um cliente.'
    */

    /*
    #swagger.parameters['id'] = {
        description: 'Id do Cliente',
        type: 'string',
        required: true,
        in: 'path',
        example: '61ae6508bc916ae4027da93e',
    }
    */

    /*  
    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Dados do agendamento',
            schema: {
                $time: '2021-10-11 20:00',
                $duration: 1,
                $description: 'Agendamento numero 1'
            }
    } */
    try {
        if (!req.params.id) {
            res.status(400).send('Id do cliente não foi informado.')
            return ;
        }

        var c = await client.get(req.params.id)

        if (!c) {
            res.status(400).send('Cliente não localizado')
            return ;
        }

        var result = await client.schedule_insert(c, req.body)
        if (result[0] === false) {
            res.status(400).send(result[1])
        }
        else {
            res.status(200).send(result[1])
        }
    }
    catch(err) {
        res.status(500).send('Internal Server Error')
    }
})

router.delete('/client/:id/schedule/:schedule_id', async(req, res) => {
    /*
    #swagger.description = 'Endpoint para excluir agendamento de um cliente.'
    */

    /*
    #swagger.parameters['id'] = {
        description: 'Id do Cliente',
        type: 'string',
        required: true,
        in: 'path',
        example: '61ae6508bc916ae4027da93e',
    }
    */

    /*
    #swagger.parameters['schedule_id'] = {
        description: 'Id do Agendamento',
        type: 'string',
        required: true,
        in: 'path',
        example: '61ae6508bc916ae4027da93e',
    }
    */
    try {
        if (!req.params.id) {
            res.status(400).send('Id do cliente não foi informado.')
            return ;
        }

        if (!req.params.schedule_id) {
            res.status(400).send('Id do agendamento não foi informado.')
            return ;
        }

        var c = await client.get(req.params.id)

        if (!c) {
            res.status(400).send('Cliente não localizado')
            return ;
        }

        var result = await client.schedule_remove(c, req.params.schedule_id)
        if (result[0] === false) {
            res.status(400).send(result[1])
        }
        else {
            res.status(200).send(result[1])
        }
    }
    catch(err) {
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;